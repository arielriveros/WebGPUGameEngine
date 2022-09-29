import { vec3, quat } from "gl-matrix";

interface transformParameters {
    position?: vec3;
    rotation?: quat;
    scale?: vec3;
}

export class Transform {
    private position: vec3 = vec3.create();
    private rotation: quat = quat.create();
    private scale: vec3 = vec3.create();

    public constructor(parameters: transformParameters) {
        "position" in parameters ? vec3.copy(this.position, parameters.position as vec3) : vec3.set(this.position, 0, 0, 0);
        "rotation" in parameters ? quat.copy(this.rotation, parameters.rotation as quat) : quat.set(this.rotation, 0, 0, 0, 0);
        "scale" in parameters ? vec3.copy(this.scale, parameters.scale as vec3) : vec3.set(this.scale, 1, 1, 1);
    }
}