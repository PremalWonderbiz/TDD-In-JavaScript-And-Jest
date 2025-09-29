import { attachGridEventHandler, countNeighbours, drawGrid, game, generate, getCellsFromDom, isAlive, regenerate, start } from '../game.js';
// import * as game from "../game.js";

describe("Game of Life", () => {
    test("game should be defined", () => {
        expect(game).toBeDefined();
    });

    describe("isAlive algorithm", () => {
        test("dead cell with no neighbours", () => {
            expect(isAlive(0,0)).toEqual(0);
        });

        test("dead cell with 3 neighbours should return 1", () => {
            expect(isAlive(0,3)).toEqual(1);
        });

        
        test("live cell with no neighbours", () => {
            expect(isAlive(1,0)).toEqual(0);
        });
        test("live cell with 2 neighbours should return 1", () => {
            expect(isAlive(1,2)).toEqual(1);
        });
    });

    describe("generate function", () => { 
        test("should create an array of x * x", () => {
            expect(generate(1)).toEqual([0]);
            expect(generate(2)).toEqual([0, 0, 0, 0]);
        });
    });
    describe("countNeighbours", () => {
        test("should count 1 for array of one", () => {
            expect(countNeighbours([1], 0)).toEqual(0);
        });

        test("should count 2 neighbours", () => {
            expect(countNeighbours([1,1,1,0], 0)).toEqual(2);
        });
        test("should count 2 neighbours", () => {
            expect(countNeighbours([1,1,1,0], 1)).toEqual(2);
        });
        test("should count 2 neighbours", () => {
            expect(countNeighbours([1,1,1,0], 2)).toEqual(2);
        });
        test("should count 3 neighbours", () => {
            expect(countNeighbours([1,1,1,0], 3)).toEqual(3);
        });
        test("should count 3 neighbours", () => {
            expect(countNeighbours([1,1,1,0,0,0,0,0,0], 4)).toEqual(3);
        });
    });


    describe("regenerate function", () => { 
        test("should generate and update", () => {
            var cells = generate(1);
            expect(regenerate(cells)).toEqual(cells);
        });

        test("should return all dead cells", () => {
            var initialCells = generate(2);
            var cells = generate(2);

            cells[0] = 1;

            expect(regenerate(cells)).toEqual(initialCells);
        });

        test("should return all live cells", () => {
            var cells = [1,1,1,0];
            expect(regenerate(cells)).toEqual([1,1,1,1]);
        });
    });

    describe("browser grid", () => {
        test("should display 1 dead cell", () => {
            document.body.innerHTML = '<div id="grid"></div>';
            drawGrid([0]);
            expect(document.querySelectorAll('.container').length).toEqual(1);
            expect(document.querySelectorAll('.cell').length).toEqual(1);
            expect(document.querySelectorAll('.dead').length).toEqual(1);
        });

        test("should display 1 live cell", () => {
            document.body.innerHTML = '<div id="grid"></div>';
            drawGrid([1]);
            expect(document.querySelectorAll('.container').length).toEqual(1);
            expect(document.querySelectorAll('.cell').length).toEqual(1);
            expect(document.querySelectorAll('.live').length).toEqual(1);
        });
        test("should display living and dead cells", () => {
            document.body.innerHTML = '<div id="grid"></div>';
            drawGrid([0,0,1,1]);
            expect(document.querySelectorAll('.container').length).toEqual(1);
            expect(document.querySelectorAll('.cell').length).toEqual(4);
            expect(document.querySelectorAll('.row').length).toEqual(2);
            expect(document.querySelectorAll('.live').length).toEqual(2);
            expect(document.querySelectorAll('.dead').length).toEqual(2);
        });
    });

    describe("event handlers for grid", () => {
        test("click on cells should toggle live dead", () => {
            document.body.innerHTML = '<div id="grid"></div>';
            drawGrid([0]);
            attachGridEventHandler();
            expect(document.querySelectorAll('.dead').length).toEqual(1);
            expect(document.querySelectorAll('.live').length).toEqual(0);
            document.querySelector('.dead').click();
            expect(document.querySelectorAll('.dead').length).toEqual(0);
            expect(document.querySelectorAll('.live').length).toEqual(1);
            document.querySelector('.live').click();
            expect(document.querySelectorAll('.dead').length).toEqual(1);
            expect(document.querySelectorAll('.live').length).toEqual(0);
        });
    });

    describe("get cells for dom", () => {
        test("should get living and dead cells from dom", () => {
            document.body.innerHTML = '<div id="grid"></grid>';
            const cells = [0,0,1,1];
            drawGrid(cells);
            
            expect(getCellsFromDom()).toEqual(cells);
        });
    }); 

    // describe("start function", () => {
    //     test.only("start", () => {
    //         document.body.innerHTML = '<div id="grid"></grid>';
    //         const getCellsFromDomSpy = jest.spyOn(game, "getCellsFromDom");
    //         const regenerationSpy = jest.spyOn(game, "regenerate")
    //         const drawGridSpy = jest.spyOn(game, "drawGrid")
    //         start();
    //         jest.runOnlyPendingTimers();
    //         expect(setInterval).toHaveBeenCalled(); 
    //         expect(getCellsFromDomSpy).toHaveBeenCalled(); 
    //         expect(regenerationSpy).toHaveBeenCalled(); 
    //         expect(drawGridSpy).toHaveBeenCalled();
    //     });
    // });
});