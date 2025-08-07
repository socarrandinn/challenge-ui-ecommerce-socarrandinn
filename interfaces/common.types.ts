import { TFunction } from "i18next";
import { ReactNode } from "react";

export type ChildrenProps = {
    children?: ReactNode | undefined;
};

export type ClassNameProps= {
    className?: string
};


export type TProps={
    t: TFunction<["translation", ...string[]], undefined>
}