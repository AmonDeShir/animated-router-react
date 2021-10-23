declare const useOpenPage: () => (page: string, options?: {
    argument?: string | object | undefined;
    updateHistory?: boolean | undefined;
}) => void;
export default useOpenPage;
