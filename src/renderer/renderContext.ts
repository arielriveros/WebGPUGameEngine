import { checkWebGPU } from "../helper";

export class RenderContext {
    private canvasElement!: HTMLCanvasElement;
    private gpuDevice!: GPUDevice;
    private gpuCanvascontext!: GPUCanvasContext;
    private gpuTextureFormat!: GPUTextureFormat;
    private gpuAdapter!: GPUAdapter;

    public async initialize(): Promise<void> {

        if (!checkWebGPU()) { throw new Error("WebGPU is not supported"); }

        this.canvasElement = document.getElementById('game-canvas') as HTMLCanvasElement;
        this.gpuAdapter = await navigator.gpu?.requestAdapter() as GPUAdapter;
        this.gpuDevice = await this.gpuAdapter?.requestDevice() as GPUDevice;
        this.gpuCanvascontext = this.canvasElement.getContext('webgpu') as unknown as GPUCanvasContext;
        this.gpuTextureFormat = this.gpuCanvascontext.getPreferredFormat(this.gpuAdapter); // change later for navigator.gpu.getPreferredCanvasFormat()

        this.gpuCanvascontext.configure({
            device: this.gpuDevice,
            format: this.gpuTextureFormat,
            compositingAlphaMode: 'opaque' // change later for alphaMode, compositeAlphaMode will be deprecated
        });
    }

    public get adapter(): GPUAdapter {
        return this.gpuAdapter;
    }

    public get device(): GPUDevice {
        return this.gpuDevice;
    }

    public get context(): GPUCanvasContext {
        return this.gpuCanvascontext;
    }

    public get format(): GPUTextureFormat {
        return this.gpuTextureFormat;
    }

    public get canvas(): HTMLCanvasElement {
        return this.canvasElement;
    }
        
}