class Scene {

    meshes = []

    getMeshes() {
        return this.meshes;
    }

    setMeshes(value) {
        this.meshes = value;
    }

    pushMesh(_value) {
        this.meshes.push(_value);
    }

    constructor() {
        this.setScene(new THREE.Scene());
    }

    getScene() {
        return this.scene;
    }

    setScene(_obj) {
        this.scene = _obj;
    }

    addToScene(_obj) {
        this.scene.add(_obj);
        this.pushMesh(_obj);
        console.log(_obj);
    }

    removeFromSceneByUUID(uuid) {
        const object = scene.getObjectByProperty('uuid', uuid);
        object.geometry.dispose();
        object.material.dispose();
        scene.remove(object);
    }

    getChildren() {
        return this.scene.children;
    }

    getChild(i) {
        return this.scene.children[i];
    }

    remove(_obj) {
        this.scene.remove(_obj);
    }

    removeAllMeshes() {
        for (let i = this.getChildren().length - 1; i >= 0; i--) {
            if (this.getChild(i).type === "Mesh" || this.getChild(i).type === "Points")
                this.remove(scene.getChild(i));
        }
        this.setMeshes([]);
    }
}

export {Scene}