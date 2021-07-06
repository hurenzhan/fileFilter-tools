interface OptsType {
    path: string;
    action: string;
    filter: string;
    match: string;
    targetType: string;
}

class MainHandle {
    private config;

    private constructor(config: OptsType) {
        this.config = config;
    }


}