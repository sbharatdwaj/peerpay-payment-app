const User = require('../models/User');
const Transaction = require('../models/Transaction');

exports.sendPayment = async (req, res) => {
  const { receiverUsername, amount: amountStr } = req.body;
  const amount = Number(amountStr);
  const senderUsername = req.user.username;

  try {
    // Validate amount
    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({ message: 'Amount must be a positive number' });
    }

    // Find sender
    const sender = await User.findOne({ username: senderUsername });
    if (!sender) {
      return res.status(404).json({ message: 'Sender not found' });
    }

    // Check balance
    if (Number(sender.balance) < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    // Find receiver
    const receiver = await User.findOne({ username: receiverUsername });
    if (!receiver) {
      return res.status(404).json({ message: 'Receiver not found' });
    }

    // Prevent self-transfer
    if (senderUsername === receiverUsername) {
      return res.status(400).json({ message: 'Cannot send money to yourself' });
    }

    // Update balances
    sender.balance = Number(sender.balance) - amount;
    receiver.balance = Number(receiver.balance) + amount;

    // Save changes
    await sender.save();
    await receiver.save();

    // Save transaction
    const transaction = new Transaction({
      senderUsername,
      receiverUsername,
      amount,
    });
    await transaction.save();

    res.json({ message: 'Payment sent successfully', newBalance: sender.balance });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getBalance = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ balance: Number(user.balance) });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getProfile = async (req, res) => {
  console.log('Profile request for user:', req.user.username);
  try {
    const user = await User.findOne({ username: req.user.username });
    console.log('User found:', user);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ username: user.username, email: user.email, balance: Number(user.balance) });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};