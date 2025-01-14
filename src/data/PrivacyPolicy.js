import React from "react";
import privacyData from "../data/privacyPolicy.json";
import '../assets/css/data/terms.css';

export default function PrivacyPolicy() {
  const policy = privacyData.privacyPolicy;

  if (!policy || !policy.sections) {
    return <p>개인정보 처리방침 데이터를 불러오는 데 문제가 발생했습니다.</p>;
  }

  return (
    <div className="terms-page">
      <h1>{policy.title}</h1>
      {policy.sections.map((section, index) => (
        <div key={index} className="terms-section">
          <h2>{section.title}</h2>
          {section.content.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      ))}
      <p className="effective-date">시행일: {policy.effectiveDate}</p>
    </div>
  );
}
