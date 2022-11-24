import { RenderContextGPU } from "./webgpu/renderContextWebGPU";
import { Pipeline } from "./pipeline";

export class Renderer {

    context: RenderContextGPU;

    constructor() {
        this.context = new RenderContextGPU();
    }

    public async initialize(): Promise<void> {
        await this.context.initialize();
    }   

    /**
     * Draws a frame to the canvas using the given pipeline
     * @param pipeline Pipeline to use for drawing
     */
    public render(pipeline: Pipeline): void {
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
        const webGpuPipeline: GPURenderPipeline = pipeline.getPipeline();
        passEncoder.setPipeline(webGpuPipeline);
        passEncoder.draw(3, 1, 0, 0);
        passEncoder.end();

        const buffer: GPUCommandBuffer = commandEncoder.finish();
        this.context.device.queue.submit([buffer]);
    }
}