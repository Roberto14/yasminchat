export default function loadJs(src: string): Promise<any> {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.setAttribute('src', src)
        script.setAttribute('defer', '')
        document.body.appendChild(script)
        script.onload = resolve
        script.onerror = reject
    })
}
