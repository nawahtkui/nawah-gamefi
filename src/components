import React, { useState } from "react";
import { ethers } from "ethers";

export const LoginAndKYC: React.FC = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [kycData, setKycData] = useState({
    fullName: "",
    idNumber: "",
    idFile: null as File | null,
  });
  const [kycStatus, setKycStatus] = useState<"not_submitted" | "pending" | "approved" | "rejected">("not_submitted");

  // توصيل الميتاماسك
  const connectWallet = async () => {
    if (!(window as any).ethereum) {
      alert("يرجى تثبيت MetaMask");
      return;
    }
    const provider = new ethers.providers.Web3Provider((window as any).ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    setAccount(address);
  };

  // تحديث بيانات النموذج
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setKycData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setKycData((prev) => ({ ...prev, idFile: e.target.files![0] }));
    }
  };

  // رفع بيانات KYC إلى السيرفر (مثال)
  const submitKyc = async () => {
    if (!kycData.fullName || !kycData.idNumber || !kycData.idFile) {
      alert("يرجى ملء جميع الحقول ورفع صورة الهوية");
      return;
    }

    const formData = new FormData();
    formData.append("fullName", kycData.fullName);
    formData.append("idNumber", kycData.idNumber);
    formData.append("idFile", kycData.idFile);
    formData.append("walletAddress", account || "");

    try {
      const response = await fetch("/api/kyc-upload", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        alert("تم إرسال بيانات التحقق بنجاح، جاري المعالجة...");
        setKycStatus("pending");
      } else {
        alert("حدث خطأ أثناء الإرسال");
      }
    } catch (error) {
      alert("فشل الإرسال، يرجى المحاولة لاحقاً");
    }
  };

  return (
    <div dir="rtl" className="max-w-md mx-auto p-6 bg-gray-900 text-white rounded-lg space-y-6">
      {!account ? (
        <button
          onClick={connectWallet}
          className="w-full py-3 bg-yellow-500 hover:bg-yellow-600 rounded font-bold"
        >
          تسجيل الدخول بمحفظة MetaMask
        </button>
      ) : (
        <>
          <p>تم تسجيل الدخول بعنوان المحفظة:</p>
          <p className="break-all font-mono bg-gray-800 p-2 rounded">{account}</p>

          {kycStatus === "not_submitted" && (
            <>
              <h2 className="text-xl font-bold mt-4">نموذج التحقق من الهوية (KYC)</h2>

              <input
                type="text"
                name="fullName"
                placeholder="الاسم الكامل"
                className="w-full p-2 rounded bg-gray-700 text-white mb-2"
                value={kycData.fullName}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="idNumber"
                placeholder="رقم الهوية"
                className="w-full p-2 rounded bg-gray-700 text-white mb-2"
                value={kycData.idNumber}
                onChange={handleInputChange}
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full p-2 rounded bg-gray-700 text-white mb-2"
              />

              <button
                onClick={submitKyc}
                className="w-full py-3 bg-green-600 hover:bg-green-700 rounded font-bold"
              >
                إرسال بيانات التحقق
              </button>
            </>
          )}

          {kycStatus === "pending" && (
            <p className="text-yellow-400 font-semibold">تم إرسال البيانات، يرجى الانتظار للمراجعة.</p>
          )}
          {kycStatus === "approved" && (
            <p className="text-green-400 font-semibold">تم اعتماد حسابك، يمكنك الآن استخدام كامل الميزات.</p>
          )}
          {kycStatus === "rejected" && (
            <p className="text-red-500 font-semibold">تم رفض التحقق، يرجى إعادة المحاولة.</p>
          )}
        </>
      )}
    </div>
  );
};
