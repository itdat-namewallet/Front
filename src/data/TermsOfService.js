import React from "react";
import termsData from "../data/termsOfService.json";
import '../assets/css/data/terms.css';

export default function TermsOfService() {
  const terms = termsData.termsOfService;

  if (!terms || !terms.sections) {
    return <p>서비스 이용약관 데이터를 불러오는 데 문제가 발생했습니다.</p>;
  }

  return (
    <>
    <h1 className="terms-title">서비스 이용약관 v1.0(현재)</h1>
    <div className="terms-page">
      <h1>{terms.title}</h1>
      {terms.sections.map((section, index) => (
        <div key={index} className="terms-section">
          <h2>{section.title}</h2>
          {section.content.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      ))}
      <p className="effective-date">시행일: {terms.effectiveDate}</p>
    </div>
    </>
  );
}
