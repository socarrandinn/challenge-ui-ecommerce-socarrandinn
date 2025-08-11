import { TFunction } from "i18next";
import { ReactNode } from "react";

export type ChildrenProps = {
    children?: ReactNode | undefined;
};

export type ClassNameProps = {
    className?: string
};

export type IState = {
    code: number;
    name: string;
    slug: string;
};


export type TProps = {
    t: TFunction<["translation", ...string[]], undefined>
}