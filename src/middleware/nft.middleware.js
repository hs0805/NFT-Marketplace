// const catchAsync = (func) => {
//     return async (req, res, next) => {
//         try {
//             await func(req, res, next);
//         } 
//         catch(err) {
//             next(err);
//         }
//     }; 
// };

// module.exports = catchAsync;

const appLogger = (req, res, next) => {
    console.log("App Logger");
    next();
}

const nftsLogger = (req, res, next) => {
    console.log("About Logger");
    next();
}

module.exports = {
    nftsLogger,
    appLogger
};