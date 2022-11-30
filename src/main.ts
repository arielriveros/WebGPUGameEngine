import { Renderer } from "./renderer/renderer";
import { Shader } from "./renderer/shaders/shader";
import { PipelineWebGPU } from "./renderer/webgpu/pipelineWebGPU";
import config from "./config.json";

async function initialize(): Promise<void> {
    const renderer = new Renderer();
    await renderer.initialize();
    const shader = new Shader();
    shader.initialize("./shaders/shader.vs.wgsl", "./shaders/shader.fs.wgsl");
    if(config.render_api == "webgpu") { 
        const pipeline = new PipelineWebGPU(renderer.context, shader);
        await pipeline.createPipeline(shader);
        renderer.render(pipeline);
    }

}

initialize();