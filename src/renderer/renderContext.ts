import { checkWebGPU } from "../helper";

export class RenderContext {
    protected _canvasElement!: HTMLCanvasElement;
    protected _renderContext!: GPUCanvasContext;

    public async initialize(): Promise<void> {
        this._canvasElement = document.getElementById('game-canvas') as HTMLCanvasElement;
        this._renderContext = this._canvasElement.getContext('webgpu') as unknown as GPUCanvasContext;
    }

    public get renderContext(): GPUCanvasContext {
        return this._renderContext;
    }

    public set renderContext(context: GPUCanvasContext) { }

    public get canvas(): HTMLCanvasElement {
        return this._canvasElement;
    }
        
}