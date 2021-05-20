export default function waitForMs(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
