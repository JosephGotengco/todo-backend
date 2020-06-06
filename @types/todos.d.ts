declare module "todos";

export interface Todo {
	id: number;
	message: string;
	done: boolean;
	imageUrl?: string;
}

export interface Todos extends Array {
    forEach(arg0: (todo: any) => void);
	[index: number]: Todo;
}