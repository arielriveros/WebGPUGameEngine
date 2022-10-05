
export class Camera {
    private _position: Vector3;
    private _rotation: Vector3;
    private _viewMatrix: Matrix4;
    private _projectionMatrix: Matrix4;
    private _viewProjectionMatrix: Matrix4;

    constructor() {
        this._position = new Vector3(0, 0, 0);
        this._rotation = new Vector3(0, 0, 0);
        this._viewMatrix = new Matrix4();
        this._projectionMatrix = new Matrix4();
        this._viewProjectionMatrix = new Matrix4();
    }

    public get position(): Vector3 {
        return this._position;
    }

    public set position(position: Vector3) {
        this._position = position;
    }

    public get rotation(): Vector3 {
        return this._rotation;
    }

    public set rotation(rotation: Vector3) {
        this._rotation = rotation;
    }

    public get viewMatrix(): Matrix4 {
        return this._viewMatrix;
    }

    public set viewMatrix(viewMatrix: Matrix4) {
        this._viewMatrix = viewMatrix;
    }

    public get projectionMatrix(): Matrix4 {
        return this._projectionMatrix;
    }

    public set projectionMatrix(projectionMatrix: Matrix4) {
        this._projectionMatrix = projectionMatrix;
    }

    public get viewProjectionMatrix(): Matrix4 {
        return this._viewProjectionMatrix;
    }

    public set viewProjectionMatrix(viewProjectionMatrix: Matrix4) {
        this._viewProjectionMatrix = viewProjectionMatrix;
    }

    public updateViewMatrix(): void {
        const rotationMatrix: Matrix4 = Matrix4.createRotation(this._rotation);
        const translationMatrix: Matrix4 = Matrix4.createTranslation(this._position);
        this._viewMatrix = Matrix4.multiply(rotationMatrix, translationMatrix);
    }

    public updateProjectionMatrix(): void {
        this._projectionMatrix = Matrix4.createPerspective(45, 1, 0.1, 1000);
    }

    public updateViewProjectionMatrix(): void {
        this._viewProjectionMatrix = Matrix4.multiply(this._projectionMatrix, this._viewMatrix);
    }
}