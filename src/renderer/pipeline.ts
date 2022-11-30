import { Shader } from "./shaders/shader";

/* export class Pipeline {
    
        private context: RenderContextWebGPU | RenderContext; // RenderContext;
        private shader: Shader;
        private pipeline: any;
    
        constructor(context: RenderContext, shader: Shader) {

            this.context = context as RenderContextWebGPU;
            else if(config.render_api == "webgl"){
                this.context = context as RenderContext;
            }
            else{
                throw new Error("Invalid render api");
            }

            this.shader = shader;
        }
    
        public async createPipeline(shader: Shader): Promise<void> {
        
            if(config.render_api == "webgpu"){
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
            
                const pipeline = await this.context.device.createRenderPipelineAsync(pipelineDescriptor);
                this.pipeline = pipeline;
            }
            
        }

        public getPipeline(): GPURenderPipeline{
            return this.pipeline;
        }
} */

export interface PipelineBase{
    _context: any; // RenderContext;
    _shader: Shader;
    _pipeline: any;
    createPipeline(shader: Shader): void;
    getPipeline(): any;
}