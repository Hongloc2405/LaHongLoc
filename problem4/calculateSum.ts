function sumToNA(n: number): number {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

function sumToNB(n: number): number {
    return (n * (n + 1)) / 2;
}

function sumToNC(n: number): number {
    return (n === 1) ? 1 : (n + sumToNC(n - 1))
}

function testSumFunctions() {
    const testCases: { input: number; expected: number }[] = [
        { input: 1, expected: 1 },
        { input: 2, expected: 3 },
        { input: 5, expected: 15 },
        { input: 10, expected: 55 },
        { input: 100, expected: 5050 },
    ];

    testCases.forEach(({ input, expected }) => {
        const resultA = sumToNA(input);
        const resultB = sumToNB(input);
        const resultC = sumToNC(input);

        console.log(`Testing input: ${input}`);

        console.assert(resultA === expected, `sumToNA failed for input ${input}`);
        console.assert(resultB === expected, `sumToNB failed for input ${input}`);
        console.assert(resultC === expected, `sumToNC failed for input ${input}`);

        if (resultA === expected && resultB === expected && resultC === expected) {
            console.log(`All functions passed for input: ${input}`);
        } else {
            console.error(`One or more functions failed for input: ${input}`);
        }
    });
}

testSumFunctions();