
exports.index = (req, res, next)=> {
    // res.send('Hello phanu');
    res.status(200).json({
       message:'Hello user'
    })
  }

  exports.login = (req, res, next)=> {
    // res.send('Hello phanu');
    res.status(200).json({
       message:'Hello login'
    })
  }

