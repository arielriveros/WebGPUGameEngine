class Vector3 {
    public x: number;
    public y: number;
    public z: number;

    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    public get length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    public get lengthSquared(): number {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }

    public add(vector: Vector3): Vector3 {
        return new Vector3(this.x + vector.x, this.y + vector.y, this.z + vector.z);
    }

    public subtract(vector: Vector3): Vector3 {
        return new Vector3(this.x - vector.x, this.y - vector.y, this.z - vector.z);
    }

    public multiply(vector: Vector3): Vector3 {
        return new Vector3(this.x * vector.x, this.y * vector.y, this.z * vector.z);
    }

    public divide(vector: Vector3): Vector3 {
        return new Vector3(this.x / vector.x, this.y / vector.y, this.z / vector.z);
    }

    public normalize(): Vector3 {
        const length: number = this.length;
        return new Vector3(this.x / length, this.y / length, this.z / length);
    }

    public dot(vector: Vector3): number {
        return this.x * vector.x + this.y * vector.y + this.z * vector.z;
    }

    public cross(vector: Vector3): Vector3 {
        return new Vector3(this.y * vector.z - this.z * vector.y, this.z * vector.x - this.x * vector.z, this.x * vector.y - this.y * vector.x);
    }

    public static add(vector1: Vector3, vector2: Vector3): Vector3 {
        return new Vector3(vector1.x + vector2.x, vector1.y + vector2.y, vector1.z + vector2.z);
    }

    public static subtract(vector1: Vector3, vector2: Vector3): Vector3 {
        return new Vector3(vector1.x - vector2.x, vector1.y - vector2.y, vector1.z - vector2.z);
    }

    public static multiply(vector1: Vector3, vector2: Vector3): Vector3 {
        return new Vector3(vector1.x * vector2.x, vector1.y * vector2.y, vector1.z * vector2.z);
    }

    public static divide(vector1: Vector3, vector2: Vector3): Vector3 {
        return new Vector3(vector1.x / vector2.x, vector1.y / vector2.y, vector1.z / vector2.z);
    }

    public static normalize(vector: Vector3): Vector3 {
        const length: number = vector.length;
        return new Vector3(vector.x / length, vector.y / length, vector.z / length);
    }

    public static dot(vector1: Vector3, vector2: Vector3): number {
        return vector1.x * vector2.x + vector1.y * vector2.y + vector1.z * vector2.z;
    }

    public static cross(vector1: Vector3, vector2: Vector3): Vector3 {
        return new Vector3(vector1.y * vector2.z - vector1.z * vector2.y, vector1.z * vector2.x - vector1.x * vector2.z, vector1.x * vector2.y - vector1.y * vector2.x);
    }

    public static distance(vector1: Vector3, vector2: Vector3): number {
        const x: number = vector1.x - vector2.x;
        const y: number = vector1.y - vector2.y;
        const z: number = vector1.z - vector2.z;
        return Math.sqrt(x * x + y * y + z * z);
    }

    public static distanceSquared(vector1: Vector3, vector2: Vector3): number {
        const x: number = vector1.x - vector2.x;
        const y: number = vector1.y - vector2.y;
        const z: number = vector1.z - vector2.z;
        return x * x + y * y + z * z;
    }

    public static lerp(vector1: Vector3, vector2: Vector3, amount: number): Vector3 {
        return new Vector3(vector1.x + (vector2.x - vector1.x) * amount, vector1.y + (vector2.y - vector1.y) * amount, vector1.z + (vector2.z - vector1.z) * amount);
    }

    public static clamp(vector: Vector3, min: Vector3, max: Vector3): Vector3 {
        return new Vector3(Math.max(min.x, Math.min(max.x, vector.x)), Math.max(min.y, Math.min(max.y, vector.y)), Math.max(min.z, Math.min(max.z, vector.z)));
    }

    public static min(vector1: Vector3, vector2: Vector3): Vector3 {
        return new Vector3(Math.min(vector1.x, vector2.x), Math.min(vector1.y, vector2.y), Math.min(vector1.z, vector2.z));
    }

    public static max(vector1: Vector3, vector2: Vector3): Vector3 {
        return new Vector3(Math.max(vector1.x, vector2.x), Math.max(vector1.y, vector2.y), Math.max(vector1.z, vector2.z));
    }

    public static transform(vector: Vector3, transform: Matrix4): Vector3 {
        const x: number = vector.x;
        const y: number = vector.y;
        const z: number = vector.z;
        const w: number = transform.m14 * x + transform.m24 * y + transform.m34 * z + transform.m44;
        return new Vector3((transform.m11 * x + transform.m21 * y + transform.m31 * z + transform.m41) / w, (transform.m12 * x + transform.m22 * y + transform.m32 * z + transform.m42) / w, (transform.m13 * x + transform.m23 * y + transform.m33 * z + transform.m43) / w);
    }

    public static transformNormal(vector: Vector3, transform: Matrix4): Vector3 {
        const x: number = vector.x;
        const y: number = vector.y;
        const z: number = vector.z;
        return new Vector3(transform.m11 * x + transform.m21 * y + transform.m31 * z, transform.m12 * x + transform.m22 * y + transform.m32 * z, transform.m13 * x + transform.m23 * y + transform.m33 * z);
    }

    public static transformCoordinates(vector: Vector3, transform: Matrix4): Vector3 {
        const x: number = vector.x;
        const y: number = vector.y;
        const z: number = vector.z;
        return new Vector3(transform.m11 * x + transform.m21 * y + transform.m31 * z + transform.m41, transform.m12 * x + transform.m22 * y + transform.m32 * z + transform.m42, transform.m13 * x + transform.m23 * y + transform.m33 * z + transform.m43);
    }

    public static transformCoordinate(vector: Vector3, transform: Matrix4): Vector3 {
        const x: number = vector.x;
        const y: number = vector.y;
        const z: number = vector.z;
        const w: number = transform.m14 * x + transform.m24 * y + transform.m34 * z + transform.m44;
        return new Vector3((transform.m11 * x + transform.m21 * y + transform.m31 * z + transform.m41) / w, (transform.m12 * x + transform.m22 * y + transform.m32 * z + transform.m42) / w, (transform.m13 * x + transform.m23 * y + transform.m33 * z + transform.m43) / w);
    }
}

class Matrix4
{
    
    public m11: number;
    public m12: number;
    public m13: number;
    public m14: number;
    public m21: number;
    public m22: number;
    public m23: number;
    public m24: number;
    public m31: number;
    public m32: number;
    public m33: number;
    public m34: number;
    public m41: number;
    public m42: number;
    public m43: number;
    public m44: number;

    public constructor(initialM11: number = 1, initialM12: number = 0, initialM13: number = 0, initialM14: number = 0, initialM21: number = 0, initialM22: number = 1, initialM23: number = 0, initialM24: number = 0, initialM31: number = 0, initialM32: number = 0, initialM33: number = 1, initialM34: number = 0, initialM41: number = 0, initialM42: number = 0, initialM43: number = 0, initialM44: number = 1) {
        this.m11 = initialM11;
        this.m12 = initialM12;
        this.m13 = initialM13;
        this.m14 = initialM14;
        this.m21 = initialM21;
        this.m22 = initialM22;
        this.m23 = initialM23;
        this.m24 = initialM24;
        this.m31 = initialM31;
        this.m32 = initialM32;
        this.m33 = initialM33;
        this.m34 = initialM34;
        this.m41 = initialM41;
        this.m42 = initialM42;
        this.m43 = initialM43;
        this.m44 = initialM44;
    }


    public static get identity(): Matrix4 {
        return new Matrix4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    }

    public static get zero(): Matrix4 {
        return new Matrix4(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }

    public static get rotationX(): Matrix4 {
        return new Matrix4(1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }

    public static get rotationY(): Matrix4 {
        return new Matrix4(0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }

    public static get rotationZ(): Matrix4 {

        return new Matrix4(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0);
    }

    public static get scaling(): Matrix4 {
        return new Matrix4(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }

    public static get translation(): Matrix4 {
        return new Matrix4(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }

    public static get perspective(): Matrix4 {
        return new Matrix4(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }

    public static get orthographic(): Matrix4 {
        return new Matrix4(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }

    public static get lookAt(): Matrix4 {
        return new Matrix4(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }

    public static createPerspective(arg0: number, arg1: number, arg2: number, arg3: number): Matrix4 {
        // creates a perspective projection matrix
        const matrix: Matrix4 = new Matrix4();
        const yScale: number = 1.0 / Math.tan(arg0 * 0.5);
        const xScale: number = yScale / arg1;
        const frustumLength: number = arg3 - arg2;
        matrix.m11 = xScale;
        matrix.m22 = yScale;
        matrix.m33 = -((arg3 + arg2) / frustumLength);
        matrix.m34 = -1;
        matrix.m43 = -((2 * arg2 * arg3) / frustumLength);
        matrix.m44 = 0;

        return matrix;
    }
    public static multiply(mat1: Matrix4, mat2: Matrix4): Matrix4 {
        // multiplies two matrices
        const matrix: Matrix4 = new Matrix4();
        matrix.m11 = mat1.m11 * mat2.m11 + mat1.m12 * mat2.m21 + mat1.m13 * mat2.m31 + mat1.m14 * mat2.m41;
        matrix.m12 = mat1.m11 * mat2.m12 + mat1.m12 * mat2.m22 + mat1.m13 * mat2.m32 + mat1.m14 * mat2.m42;
        matrix.m13 = mat1.m11 * mat2.m13 + mat1.m12 * mat2.m23 + mat1.m13 * mat2.m33 + mat1.m14 * mat2.m43;
        matrix.m14 = mat1.m11 * mat2.m14 + mat1.m12 * mat2.m24 + mat1.m13 * mat2.m34 + mat1.m14 * mat2.m44;
        matrix.m21 = mat1.m21 * mat2.m11 + mat1.m22 * mat2.m21 + mat1.m23 * mat2.m31 + mat1.m24 * mat2.m41;
        matrix.m22 = mat1.m21 * mat2.m12 + mat1.m22 * mat2.m22 + mat1.m23 * mat2.m32 + mat1.m24 * mat2.m42;
        matrix.m23 = mat1.m21 * mat2.m13 + mat1.m22 * mat2.m23 + mat1.m23 * mat2.m33 + mat1.m24 * mat2.m43;
        matrix.m24 = mat1.m21 * mat2.m14 + mat1.m22 * mat2.m24 + mat1.m23 * mat2.m34 + mat1.m24 * mat2.m44;
        matrix.m31 = mat1.m31 * mat2.m11 + mat1.m32 * mat2.m21 + mat1.m33 * mat2.m31 + mat1.m34 * mat2.m41;
        matrix.m32 = mat1.m31 * mat2.m12 + mat1.m32 * mat2.m22 + mat1.m33 * mat2.m32 + mat1.m34 * mat2.m42;
        matrix.m33 = mat1.m31 * mat2.m13 + mat1.m32 * mat2.m23 + mat1.m33 * mat2.m33 + mat1.m34 * mat2.m43;
        matrix.m34 = mat1.m31 * mat2.m14 + mat1.m32 * mat2.m24 + mat1.m33 * mat2.m34 + mat1.m34 * mat2.m44;
        matrix.m41 = mat1.m41 * mat2.m11 + mat1.m42 * mat2.m21 + mat1.m43 * mat2.m31 + mat1.m44 * mat2.m41;
        matrix.m42 = mat1.m41 * mat2.m12 + mat1.m42 * mat2.m22 + mat1.m43 * mat2.m32 + mat1.m44 * mat2.m42;
        matrix.m43 = mat1.m41 * mat2.m13 + mat1.m42 * mat2.m23 + mat1.m43 * mat2.m33 + mat1.m44 * mat2.m43;
        matrix.m44 = mat1.m41 * mat2.m14 + mat1.m42 * mat2.m24 + mat1.m43 * mat2.m34 + mat1.m44 * mat2.m44;
        return matrix;
    }

    public static createTranslation(_position: Vector3): Matrix4 {
        // creates a translation matrix
        const matrix: Matrix4 = new Matrix4();
        matrix.m41 = _position.x;
        matrix.m42 = _position.y;
        matrix.m43 = _position.z;
        return matrix;
    }

    public static createRotation(_rotation: Vector3): Matrix4 {
        // creates a rotation matrix
        const matrix: Matrix4 = new Matrix4();
        matrix.m11 = Math.cos(_rotation.y) * Math.cos(_rotation.z);
        matrix.m12 = Math.cos(_rotation.y) * Math.sin(_rotation.z);
        matrix.m13 = -Math.sin(_rotation.y);
        matrix.m21 = Math.sin(_rotation.x) * Math.sin(_rotation.y) * Math.cos(_rotation.z) - Math.cos(_rotation.x) * Math.sin(_rotation.z);
        matrix.m22 = Math.sin(_rotation.x) * Math.sin(_rotation.y) * Math.sin(_rotation.z) + Math.cos(_rotation.x) * Math.cos(_rotation.z);
        matrix.m23 = Math.sin(_rotation.x) * Math.cos(_rotation.y);
        matrix.m31 = Math.cos(_rotation.x) * Math.sin(_rotation.y) * Math.cos(_rotation.z) + Math.sin(_rotation.x) * Math.sin(_rotation.z);
        matrix.m32 = Math.cos(_rotation.x) * Math.sin(_rotation.y) * Math.sin(_rotation.z) - Math.sin(_rotation.x) * Math.cos(_rotation.z);
        matrix.m33 = Math.cos(_rotation.x) * Math.cos(_rotation.y);
        return matrix;
    }


}