const { Thought, User } = require('../models');

const userController = {

    // GET ALL USERS 
    getAllUsers(req, res) {
        User.find({})
    //     .select('-__v')
    //     .then(dbUserData => res.json(dbUserData))
    //     .catch(err => {
    //         console.log(err);
    //         res.sendStatus(400).json(err);
    //     });
    // },
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
},
    // GET ONE USER BY ID
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .populate({
            path: 'friends',
            select: '-__v'
        })
        .select('-__v')

        .then(dbUserData => {
            console.log(dbUserData);
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    // CREATE NEW USER
    createUser({ body }, res) {
        // console.log(body);
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch((err) => res.status(400).json(err));
    },

    // UPDATE USER BY ID 
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(dbUserData => {
          if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
          }
          res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

    // DELETE USER 
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
        .then((dbUserData) => {
          if (!dbUserData) {
            res.status(404).json({ message: "No user found with this id!" });
            return;
          }
          res.json(dbUserData);
        })
          .catch((err) => res.status(400).json(err));
      },

    //  ADD FRIEND   
    addFriend({ params }, res) {
        User.findOneAndUpdate({ _id: params.userId }, { $push: { friends: params.friendId } }, {new: true, runValidators: true })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
                })
                .catch(err => res.status(400).json(err));
            },
        
    //  DELETE FRIEND
    deleteFriend({ params }, res) {
            User.findOneAndUpdate({ _id: params.userId}, {$pull: { friends: params.friendId}}, {new: true,  runValidators: true})
               .then(dbFriendData => {
                   if(!dbFriendData) {
                       res.status(404).json({ message: "No User with this id!"});
                       return;
                   }
                    res.json(dbFriendData);
                   })  
                   .catch(err => res.json(err));
               }
        };

        module.exports = userController; 
