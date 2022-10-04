import {Shader} from "./shaders/shader";
import { RenderContext } from "./renderContext";
import { RenderContextGPU } from "./webgpu/renderContextWebGPU";

export class Renderer {

    context: RenderContextGPU;

    constructor() {
        this.context = new RenderContextGPU();
    }

    public async initialize(): Promise<void> {
        await this.context.initialize();
    }

    public createPipeline(shader: Shader): GPURenderPipeline {
        const pipelineDescriptor: GPURenderPipelineDescriptor = {
            layout: 'auto',
            vertex: {
                module: this.context.device.createShaderModule({
                    code: shader.vertexShader
                }),
                entryPoint: 'vs_main',
            },

            fragment: {
                module: this.context.device.createShaderModule({
                    code: shader.fragmentShader
                }),
                entryPoint: 'fs_main',
                targets: [{
                    format: this.context.format
                }]
            },
            primitive: { topology: 'triangle-list' }
        }

        return this.context.device.createRenderPipeline(pipelineDescriptor);
    }

        
    public render(pipeline: GPURenderPipeline): void {
        const commandEncoder: GPUCommandEncoder = this.context.device.createCommandEncoder();
        const textureView: GPUTextureView = this.context.renderContext.getCurrentTexture().createView();
       
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

        this.context.device.queue.submit([commandEncoder.finish()]);
    }
}