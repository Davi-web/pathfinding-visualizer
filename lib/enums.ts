enum OnClickState {
    START = 'START',
    REMOVE_WALL = 'REMOVE_WALL',
    ADD_WALL = 'ADD_WALL',
    END = 'END',
    NULL = 'NULL',
}
  
enum BOARDSTATE {
    EMPTY = 0,
    WALL = 1,
    START = 2,
    END = 3,
}

enum STEPS {
    INTRO = 0,
    DESCRIPTION = 1,
    ALGORITHMS = 2,
    VIDEO = 3,
    TECH_STACK = 4,
}
export { OnClickState, BOARDSTATE, STEPS}