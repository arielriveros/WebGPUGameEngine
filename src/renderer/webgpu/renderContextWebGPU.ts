import { RenderContext } from "../renderContext";
import { checkWebGPU } from "./helper";

export class RenderContextWebGPU extends RenderContext {
    private _device!: GPUDevice;
    private _textureFormat!: GPUTextureFormat;
    private _adapter!: GPUAdapter;

    public async initialize(): Promise<void> {
        super.initialize();
        if (!checkWebGPU()) { throw new Error("WebGPU is not supported"); }

        this._adapter = await navigator.gpu?.requestAdapter() as GPUAdapter;
        this._device = await this._adapter?.requestDevice() as GPUDevice;
        this._textureFormat = 'rgba8unorm';// super.renderContext.getPreferredFormat(this._adapter); // change later for navigator.gpu.getPreferredCanvasFormat()

        super.renderContext.configure({
            device: this._device,
            format: this._textureFormat,
            compositingAlphaMode: 'opaque' // change later for alphaMode, compositeAlphaMode will be deprecated
        });
    }

    public get adapter(): GPUAdapter { return this._adapter; }

    public get format(): GPUTextureFormat { return this._textureFormat; }

    public set format(format: GPUTextureFormat) { this._textureFormat = format; }

    public get device(): GPUDevice { return this._device; }
        
}