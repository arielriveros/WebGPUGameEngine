export class Buffer {
    private _device: GPUDevice
    private _buffer: GPUBuffer;
    private _size: number;
    private _usage: GPUBufferUsageFlags;

    constructor(device: GPUDevice, size: number, usage: GPUBufferUsageFlags) {
        this._size = size;
        this._usage = usage;
        this._device = device;
        this._buffer = this.createGPUBuffer(device, new Float32Array(size), usage);
    }

    public createGPUBuffer(device: GPUDevice, data: Float32Array, usageFlag:GPUBufferUsageFlags = GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST): GPUBuffer {
        const buffer = device.createBuffer({
            size: data.byteLength,
            usage: usageFlag,
            mappedAtCreation: true
        })
        buffer.unmap();
        return buffer;
    }

    public uploadData(data: Float32Array): void {
        new Float32Array(this._buffer.getMappedRange()).set(data);
    }

    public get buffer(): GPUBuffer {
        return this._buffer;
    }

    public get size(): number {
        return this._size;
    }

    public get usage(): GPUBufferUsageFlags {
        return this._usage;
    }
} 