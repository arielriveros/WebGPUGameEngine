import { Renderer } from "./renderer/renderer";
import { Shader } from "./renderer/shaders/shader";

async function initialize(): Promise<void> {
    const renderer = new Renderer();
    await renderer.initialize();
    const shader = new Shader();
    shader.initialize("./shaders/shader.vs.wgsl", "./shaders/shader.fs.wgsl");
    const pipeline = renderer.createPipeline(shader);
    renderer.render(pipeline);

}

initialize();