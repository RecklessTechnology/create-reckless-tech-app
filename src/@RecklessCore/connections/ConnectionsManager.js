import { useEffect } from 'react';

import { joinRoom, selfId } from 'trystero';
import useAppContext from '../useAppContext';

import useConnectionsContext from '../useConnectionsContext';
import generateRoomId from '../utils/generateRoomId';

export default function ConnectionsManager({
    children,
    ...props
}) {
    const { setSceneJSON, publish } = useAppContext();
    const { connectionType, registerPeer, unregisterPeer, roomId, setRoomId, room, setRoom } = useConnectionsContext();

    useEffect(()=>{
      // console.log(roomId);
      if (roomId === null) {
        // console.log(JSON.parse(localStorage.getItem("roomId")));
        setRoomId(
          JSON.parse(localStorage.getItem("roomId")) === null ? 
          generateRoomId() : JSON.parse(localStorage.getItem("roomId"))
        );
      }
    }, [roomId, setRoomId])

    useEffect(() => {
      localStorage.setItem("roomId", JSON.stringify(roomId));
    }, [roomId]);

    useEffect(()=>{
      if (room === null && roomId !== null) {
        setRoom(joinRoom({appId: 'Reckless Technology'}, roomId));
        console.log(roomId);
      }
    }, [setRoom, room, roomId, registerPeer])

    useEffect(()=>{
      if (room !== null) {
        const [ sendData, getData ] = room.makeAction('scene');
        registerPeer(selfId,{
          id: selfId,
          isMe: true,
          sever: (connectionType === 'server'),
          lastSeen: Date.now(),
          getData,
          sendData,
        });
        room.onPeerJoin(id => {
          registerPeer(id,{
            latency: async () => (`${await room.ping(id)}ms`),
            id: id,
            isMe: (id === selfId),
            server: false,
            lastSeen: Date.now(),
            getData,
            sendData,
          })
        });
        room.onPeerLeave(id => unregisterPeer(id));
        // room.onPeerStream((stream, id) => console.log(`${id} streaming`))
        getData((data)=>{
          if (data.type === 'shareScene') {
            setSceneJSON(data.payload);
            publish('scene-changed', data.payload);
          } else {
            console.log('data', data);
          }
        })
      }
    }, [room, registerPeer, unregisterPeer, connectionType, setSceneJSON])

    return children;
}
