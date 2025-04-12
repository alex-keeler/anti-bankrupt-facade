export type MenuItem = {
    title: string,
    onClick?: () => void,
    children?: MenuItem[],
    disabled?: boolean,
}