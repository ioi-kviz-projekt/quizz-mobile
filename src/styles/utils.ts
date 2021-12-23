
export function border(width: number, color: string, style: string = "solid"): object {
    return {
        borderWidth: width,
        borderColor: color,
        borderStyle: style,
    };
}
