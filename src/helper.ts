/* Check whether the browser is compatible with WebGPU */
export function checkWebGPU(): boolean
{
    return navigator.gpu !== null && navigator.gpu !== undefined;
}