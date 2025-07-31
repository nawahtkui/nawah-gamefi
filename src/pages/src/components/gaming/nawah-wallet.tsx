import React, { useState } from "react";
import { Eye, EyeOff, ArrowDownLeft, ArrowUpRight, Repeat, Gift, Copy } from "lucide-react";
import { toast } from "react-hot-toast";

export const NawahWallet: React.FC = () => {
  const [nawahBalance, setNawahBalance] = useState(1250.75);
  const [pointsBalance, setPointsBalance] = useState(2450);
  const [showBalance, setShowBalance] = useState(true);
  const [sendAmount, setSendAmount] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [convertAmount, setConvertAmount] = useState("");

  const walletAddress = "0xNW7d8f9a2b1c3e4f5g6h7i8j9k0l1m2n3o4p5q6r";
  const conversionRate = 10; // 10 نقاط = 1 NAWAH

  const [transactions, setTransactions] = useState([
    {
      id: "1",
      type: "reward",
      amount: 50,
      description: "مكافأة إنجاز تعليمي",
      timestamp: "2024-01-15T10:30:00Z",
      status: "completed",
    },
    {
      id: "2",
      type: "convert",
      amount: 100,
      description: "تحويل من النقاط إلى NAWAH",
      timestamp: "2024-01-14T15:20:00Z",
      status: "completed",
    },
    {
      id: "3",
      type: "send",
      amount: 25,
      to: "0xabc...def",
      description: "إرسال إلى صديق",
      timestamp: "2024-01-13T09:15:00Z",
      status: "completed",
    },
    {
      id: "4",
      type: "receive",
      amount: 75,
      from: "0x123...789",
      description: "استلام من مشروع تطوعي",
      timestamp: "2024-01-12T14:45:00Z",
      status: "completed",
    },
  ]);

  const handleConvertPoints = () => {
    const amount = parseFloat(convertAmount);
    if (!amount || amount < 10) {
      toast.error("الحد الأدنى للتحويل 10 نقاط");
      return;
    }
    if (amount > pointsBalance) {
      toast.error("ليس لديك نقاط كافية للتحويل");
      return;
    }

    const nawahAmount = amount / conversionRate;
    setPointsBalance((prev) => prev - amount);
    setNawahBalance((prev) => prev + nawahAmount);
    setTransactions((prev) => [
      {
        id: (prev.length + 1).toString(),
        type: "convert",
        amount,
        description: `تحويل ${amount} نقطة`,
        timestamp: new Date().toISOString(),
        status: "completed",
      },
      ...prev,
    ]);
    setConvertAmount("");
    toast.success(`تم تحويل ${amount} نقطة إلى ${nawahAmount.toFixed(2)} NAWAH`);
  };

  const handleSendToken = () => {
    const amount = parseFloat(sendAmount);
    if (!amount || amount <= 0) {
      toast.error("يرجى إدخال مبلغ صحيح");
      return;
    }
    if (amount > nawahBalance) {
      toast.error("ليس لديك رصيد كافي من NAWAH");
      return;
    }
    if (!recipientAddress) {
      toast.error("يرجى إدخال عنوان المستقبل");
      return;
    }

    setNawahBalance((prev) => prev - amount);
    setTransactions((prev) => [
      {
        id: (prev.length + 1).toString(),
        type: "send",
        amount,
        to: recipientAddress,
        description: `إرسال ${amount} NAWAH`,
        timestamp: new Date().toISOString(),
        status: "completed",
      },
      ...prev,
    ]);
    setSendAmount("");
    setRecipientAddress("");
    toast.success(`تم إرسال ${amount} NAWAH`);
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    toast.success("تم نسخ عنوان المحفظة");
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "send":
        return <ArrowUpRight className="text-red-500" />;
      case "receive":
        return <ArrowDownLeft className="text-green-500" />;
      case "convert":
        return <Repeat className="text-yellow-500" />;
      case "reward":
        return <Gift className="text-purple-500" />;
      default:
        return null;
    }
  };

  const getTransactionLabel = (type: string) => {
    switch (type) {
      case "send":
        return "إرسال";
      case "receive":
        return "استلام";
      case "convert":
        return "تحويل";
      case "reward":
        return "مكافأة";
      default:
        return type;
    }
  };

  return (
    <div dir="rtl" className="space-y-6 text-white">
      {/* Wallet Overview */}
      <div className="bg-gray-800 p-6 rounded-xl shadow">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-bold">محفظة NAWAH</h2>
          <button
            onClick={() => setShowBalance(!showBalance)}
            className="text-gray-300 hover:text-yellow-400"
            aria-label="Toggle balance visibility"
          >
            {showBalance ? <EyeOff /> : <Eye />}
          </button>
        </div>
        <p className="text-2xl font-mono mb-1">
          {showBalance ? `${nawahBalance.toFixed(2)} NAWAH` : "••••••"}
        </p>
        <div className="flex items-center gap-2 text-sm select-all">
          <span className="truncate">{walletAddress}</span>
          <button onClick={copyAddress} aria-label="Copy wallet address">
            <Copy className="w-5 h-5 text-gray-300 hover:text-yellow-400" />
          </button>
        </div>
      </div>

      {/* Points Balance */}
      <div className="bg-gray-800 p-6 rounded-xl shadow flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-300">رصيد النقاط</p>
          <p className="text-xl font-semibold">{pointsBalance.toLocaleString()} نقطة</p>
        </div>
        <p className="text-sm text-yellow-400">{conversionRate} نقطة = 1 NAWAH</p>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Convert Points */}
        <section className="bg-gray-800 p-6 rounded-xl shadow space-y-3">
          <h3 className="text-lg font-bold">تحويل النقاط</h3>
          <input
            type="number"
            className="w-full p-3 rounded bg-gray-700 text-white focus:outline-yellow-400"
            placeholder="عدد النقاط للتحويل"
            value={convertAmount}
            onChange={(e) => setConvertAmount(e.target.value)}
            min={10}
            step={10}
          />
          {convertAmount && (
            <p className="text-green-400">
              ستحصل على: {(parseFloat(convertAmount) / conversionRate).toFixed(2)} NAWAH
            </p>
          )}
          <button
            onClick={handleConvertPoints}
            className="w-full py-3 bg-yellow-500 hover:bg-yellow-600 rounded font-semibold text-black"
          >
            تحويل إلى NAWAH
          </button>
        </section>

        {/* Send Token */}
        <section className="bg-gray-800 p-6 rounded-xl shadow space-y-3">
          <h3 className="text-lg font-bold">إرسال NAWAH</h3>
          <input
            type="text"
            className="w-full p-3 rounded bg-gray-700 text-white focus:outline-yellow-400"
            placeholder="عنوان المستقبل"
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
          />
          <input
            type="number"
            className="w-full p-3 rounded bg-gray-700 text-white focus:outline-yellow-400"
            placeholder="المبلغ (NAWAH)"
            value={sendAmount}
            onChange={(e) => setSendAmount(e.target.value)}
            min={0}
            step={0.01}
          />
          <button
            onClick={handleSendToken}
            className="w-full py-3 bg-green-600 hover:bg-green-700 rounded font-semibold text-black"
          >
            إرسال
          </button>
        </section>
      </div>

      {/* Transaction History */}
      <section className="bg-gray-800 p-6 rounded-xl shadow">
        <h3 className="text-lg font-bold mb-4">تاريخ المعاملات</h3>
        <ul className="space-y-4 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-yellow-400">
          {transactions.map((tx) => (
            <li
              key={tx.id}
              className="flex justify-between items-center border-b border-gray-700 pb-2"
              title={`${getTransactionLabel(tx.type)} - ${tx.description}`}
            >
              <div className="flex items-center gap-3">
                {getTransactionIcon(tx.type)}
                <div className="text-sm">
                  <p>{tx.description}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(tx.timestamp).toLocaleDateString("ar")}{" "}
                    {(tx.from && `من: ${tx.from}`) || (tx.to && `إلى: ${tx.to}`)}
                  </p>
                </div>
              </div>
              <p
                className={`font-mono ${
                  tx.type === "send" ? "text-red-400" : "text-green-400"
                }`}
              >
                {tx.type === "send" ? "-" : "+"}
                {tx.amount.toFixed(2)} NAWAH
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};
