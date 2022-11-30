import { PipelineBase } from "../pipeline";
import { Shader } from "../shaders/shader";

export class PipelineWebGPU implements PipelineBase { 
    _context: any; // RenderContext;
    _shader: Shader;
    _pipeline: any;

    constructor(context: any, shader: Shader) {
        this._context = context;
        this._shader = shader;
    }

    public createPipeline(shader: Shader): void {
        const pipelineDescriptor: GPURenderPipelineDescriptor = {
            layout: 'auto',
            vertex: {
                module: this._context.device.createShaderModule({
                    code: shader.vertexShader
                }),
                entryPoint: 'vs_main',
            },

            fragment: {
                module: this._context.device.createShaderModule({
                    code: shader.fragmentShader
                }),
                entryPoint: 'fs_main',
                targets: [{
                    format: this._context.format
                }]
            },
            primitive: { topology: 'triangle-list' }
        }

        const pipeline = this._context.device.createRenderPipeline(pipelineDescriptor);
        this._pipeline = pipeline;
    }

    public getPipeline(): GPURenderPipeline{
        return this._pipeline;
    }
}