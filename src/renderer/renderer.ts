import { checkWebGPU } from "../helper";
import shader from "./shaders/shader.wgsl";

export class Renderer {

    private canvas!: HTMLCanvasElement;
    private device!: GPUDevice;
    private context!: GPUCanvasContext;
    private format!: GPUTextureFormat;

    constructor() { }

    public async initialize(): Promise<void> {

        if (!checkWebGPU()) { throw new Error("WebGPU is not supported"); }

        const adapter: GPUAdapter = await navigator.gpu?.requestAdapter() as GPUAdapter;
        const format: GPUTextureFormat = 'bgra8unorm';

        this.canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
        this.device = await adapter?.requestDevice() as GPUDevice;
        this.context = this.canvas.getContext('webgpu') as unknown as GPUCanvasContext;

        this.context.configure({
            device: this.device,
            format: format
        });

        const pipelineDescriptor: GPURenderPipelineDescriptor = {
            vertex: {
                module: this.device.createShaderModule({
                    code: shader
                }),
                entryPoint: 'vs_main',
            },

            fragment: {
                module: this.device.createShaderModule({
                    code: shader
                }),
                entryPoint: 'fs_main',
                targets: [{
                    format: format
                }]
            },
            primitive: { topology: 'triangle-list' }
        }

        const pipeline = this.device.createRenderPipeline(pipelineDescriptor);

        const commandEncoder: GPUCommandEncoder = this.device.createCommandEncoder();
        const textureView: GPUTextureView = this.context.getCurrentTexture().createView();
       
        const renderPassDescriptor: GPURenderPassDescriptor = {
            colorAttachments: [{
                view: textureView,
                clearValue: { r: 0.2, g: 0.245, b: 0.314, a: 1.0 }, // Background color
                loadOp: 'clear',
                storeOp: 'store'
            }]
        };
        
        const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);

        passEncoder.setPipeline(pipeline);
        passEncoder.draw(3, 1, 0, 0);
        passEncoder.end();

        this.device.queue.submit([commandEncoder.finish()]);
    }

    public createGpuBuffer(device: GPUDevice, data: Float32Array, usageFlag:GPUBufferUsageFlags = GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST): GPUBuffer {
        const buffer = device.createBuffer({
            size: data.byteLength,
            usage: usageFlag,
            mappedAtCreation: true
        })

        new Float32Array(buffer.getMappedRange()).set(data);
        buffer.unmap();
        return buffer;
    }
}