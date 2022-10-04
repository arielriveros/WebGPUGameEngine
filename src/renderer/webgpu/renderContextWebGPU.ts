import { RenderContext } from "../renderContext";
import { checkWebGPU } from "./helper";

export class RenderContextGPU extends RenderContext {
    private gpuDevice!: GPUDevice;
    private gpuTextureFormat!: GPUTextureFormat;
    private gpuAdapter!: GPUAdapter;

    public async initialize(): Promise<void> {

        if (!checkWebGPU()) { throw new Error("WebGPU is not supported"); }

        super.canvasElement = document.getElementById('game-canvas') as HTMLCanvasElement;
        this.gpuAdapter = await navigator.gpu?.requestAdapter() as GPUAdapter;
        this.gpuDevice = await this.gpuAdapter?.requestDevice() as GPUDevice;
        super.renderContext = this.canvasElement.getContext('webgpu') as unknown as GPUCanvasContext;
        this.gpuTextureFormat = super.renderContext.getPreferredFormat(this.gpuAdapter); // change later for navigator.gpu.getPreferredCanvasFormat()

        super.renderContext.configure({
            device: this.gpuDevice,
            format: this.gpuTextureFormat,
            compositingAlphaMode: 'opaque' // change later for alphaMode, compositeAlphaMode will be deprecated
        });
    }

    public set renderContext(context: GPUCanvasContext) { super.renderContext = context; }

    public get adapter(): GPUAdapter { return this.gpuAdapter; }

    public get format(): GPUTextureFormat { return this.gpuTextureFormat; }

    public set format(format: GPUTextureFormat) { this.gpuTextureFormat = format; }
        
}