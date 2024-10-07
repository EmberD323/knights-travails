class Node {
    constructor(data,possibleMoves,parent) {
        this.data = data;
        this.possibleMoves = possibleMoves;
        this.parent = parent;
    }
}

class Chessboard {
    constructor(){
        //matrix of 7 x 7
        let graph = [[],[],[],[],[],[],[],[]];
        //values to append 
        let i =0;
   
        for(i;i<8;i++){
            let j=0;
            for(j;j<8;j++){
            let possibleMovesThis = this.possibleMoves([i,j]);
            graph[i].push(possibleMovesThis);
            }
        }
        this.graph = graph;

    }
    possibleMoves(position){
        //logic for moves
        let i = position[0];
        let j = position[1];
        //max 8 [[i-2,j-1],[i-2,j+1],[i-1,j-2],[i-1,j+2],[i+1,j-2],[i+1,j+2],[i+2,j-1],[i+2,j+1]}
        let possibleMovesArray = [];
        if(i >= 2 && j>=1){
            possibleMovesArray.push([i-2,j-1]);
        }
        if(i>=2 && j<7){
            possibleMovesArray.push([i-2,j+1]);
        }
        if(i>=1 && j>=2){
            possibleMovesArray.push([i-1,j-2]);
        }
        if(i>=1 && j<6){
            possibleMovesArray.push([i-1,j+2]);
        }
        if(i<7 && j>=2 ){
            possibleMovesArray.push([i+1,j-2]);
        }
        if(i<7 && j<6){
            possibleMovesArray.push([i+1,j+2]);
        }
        if(i<6 && j>=1){
            possibleMovesArray.push([i+2,j-1]);
        }
        if(i<6 && j<7){
            possibleMovesArray.push([i+2,j+1]);

        }
        return possibleMovesArray
    }
    knightMoves(positionFrom,positionEnd){
        //will first look at nodes one move away.
        //add next moves to queue
        let graph = this.graph;
        let fromVertex = graph[positionFrom[0]][positionFrom[1]];
        let fromNode = new Node(positionFrom,fromVertex,undefined)
        let queue = [fromNode];
        let rootTaken = [];
        
        while (queue.length > 0) {
            //print (callback) front of queue
            const frontNode = queue.shift();
            //if frontVertex is equal to end,stop
            if(frontNode.data[0]==positionEnd[0] && frontNode.data[1]==positionEnd[1]){
                let currentNode = frontNode;
                while(currentNode.parent !== undefined){
                    rootTaken.push(currentNode);
                    currentNode = currentNode.parent;
                }
                rootTaken.push(fromNode);
                this.printEnd(rootTaken);
                return
            }
            //add children to queue
            const frontNodePossibleNextMoves = frontNode.possibleMoves;
            for(let i=0;i<frontNodePossibleNextMoves.length;i++){
                let graphPositioni = frontNodePossibleNextMoves[i][0];
                let graphPositionj= frontNodePossibleNextMoves[i][1];
                let vertex = graph[graphPositioni][graphPositionj];
                let newNode = new Node(frontNodePossibleNextMoves[i],vertex,frontNode)
                queue.push(newNode)
            }
            
        }
        return"no solution"

    }
    printEnd(rootTaken){
        let moves = rootTaken.length-1;
        console.log(moves);
        console.log(rootTaken);
        console.log("You made it in " + moves + " moves! Here's your path:")
        for(let i=moves;i>=0;i--){
            console.log(rootTaken[i].data);
        }
        // => You made it in 3 moves!  Here's your path:
        //   [3,3] - start
        //   [4,5]
        //   [2,4]
        //   [4,3] - end
      
    }
}

export {Chessboard}