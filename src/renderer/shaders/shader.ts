
export class Shader {

    private vertexSrc!: string;
    private fragmentSrc!: string;

    public initialize(vertexSrc: string, fragmentSrc: string) {
        this.vertexSrc = this.loadSource(vertexSrc) as string;
        this.fragmentSrc = this.loadSource(fragmentSrc) as string;
    }

    private loadSource(path: string): string {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", path, false);
        xhr.send(null);

        if (xhr.status == 200) {
            return xhr.responseText
        }
        else {
            return "Error Loading Shader";
        }
    }

    public get vertexShader(): string {
        return this.vertexSrc;
    }

    public get fragmentShader(): string {
        return this.fragmentSrc;
    }

}