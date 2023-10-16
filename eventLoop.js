console.log("First");

for(let i=0; i<10000000000; i++){ 
    // blocks the main thread
}

process.nextTick(()=> {
    console.log('third')
})

console.log('second')