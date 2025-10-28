// frontend/src/app/page.tsx

export default function Home() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-6" style={{color: '#5c94f7'}}>PromOcean</h1>
      <p className="text-lg mb-8" style={{color: '#343434'}}>
        프로모션과 마케팅을 위한 플랫폼
      </p>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 rounded-lg" style={{backgroundColor: '#a6fbfc'}}>
          <h3 className="text-xl font-semibold mb-4" style={{color: '#5c94f7'}}>커뮤니티</h3>
          <p style={{color: '#343434'}}>
            다양한 프로모션 아이디어와 정보를 공유합니다.
          </p>
        </div>
        <div className="p-6 rounded-lg" style={{backgroundColor: '#a6fbfc'}}>
          <h3 className="text-xl font-semibold mb-4" style={{color: '#5c94f7'}}>대회</h3>
          <p style={{color: '#343434'}}>
            창의적인 프로모션 대회에 참여해보세요.
          </p>
        </div>
      </div>
    </div>
  );
}
