const error = {
  e404: (req, res) => {
    res.status(404).json({
      code: 404,
      message: "No encontrado",
    });
  },
  e500: (req, res, error) => {
    res.status(500).json({
      code: 500,
      message: error.message,
    });
  },
};

export default error;
