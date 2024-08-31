import Image from 'next/image';
import styles from './page.module.css';

export default function Page() {
  return (
    <div className={styles.container}>
      <div className={styles.profileSection}>
        <div className={styles.imageWrapper}>
          <Image 
            src="/653450298-2.jpg" // Updated image path
            alt="Profile"
            width={200} // Adjust as needed
            height={200} // Adjust as needed
            className={styles.image}
          />
        </div>
        <div className={styles.details}>
          <h1>ชื่อ : วรชิต ทองเลิศ</h1>
          <h1>รหัสนักศึกษา : 653450298-2</h1>
          <h1>Email : worachit.t@kkumail.com</h1>
          <h1>สาขา : วิทการคอมพิวเตอร์และสารสนเทศ</h1>
        </div>
      </div>
      <h1>กำลังศึกษา : มหาวิทยาลัยขอนแก่น วิทยาเขตหนองคาย</h1>
      <h1>ที่อยู่ : ต.บ้านค้อ อ.บ้านผือ จ.อุดรธานี</h1>
      <div className={styles.projects}>
        <button className={styles.btn}>
          <a href="https://github.com/Worachit1/Sneaker-Shop" className={styles.link}>
            ผลงาน GITHUB OOP
          </a>
        </button>
        <button className={styles.btn}>
          <a href="https://github.com/Worachit1/Worachit1.github.io" className={styles.link}>
            ผลงาน GITHUB Frontend
          </a>
        </button>
      </div>
    </div>
  );
}
