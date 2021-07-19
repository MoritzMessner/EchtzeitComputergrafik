class Renderer {
    constructor() {
        this.renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    }

    getRenderer() {
        return this.renderer;
    }

    setPixelRatio(ratio = window.devicePixelRatio) {
        this.renderer.setPixelRatio(ratio);
    }

    setSize(width = window.innerWidth, height = window.innerHeight) {
        this.renderer.setSize(width, height);
    }

    xr(flag = true) {
        this.renderer.xr.enabled = flag;
    }
}

export {Renderer}