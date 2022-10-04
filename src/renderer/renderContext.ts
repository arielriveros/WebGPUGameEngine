import { checkWebGPU } from "../helper";

export class RenderContext {
    protected canvasElement!: HTMLCanvasElement;
    protected canvasContext!: GPUCanvasContext;
    device: any;
    private _format: any;
    public get format(): any {
        return this._format;
    }
    public set format(value: any) {
        this._format = value;
    }

    public async initialize(): Promise<void> {}

    public get renderContext(): GPUCanvasContext | WebGLRenderingContext{
        return this.renderContext;
    }

    public set renderContext(context: GPUCanvasContext | WebGLRenderingContext) { }

    public get canvas(): HTMLCanvasElement {
        return this.canvasElement;
    }
        
}