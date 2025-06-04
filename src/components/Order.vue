<template>
  <div class="page-container">
    <div class="container">
      <!-- 侧边栏 -->
      <div class="sidebar">
        <div class="profile">
          <div class="avatar"></div>
          <div class="name">Name</div>
        </div>
        <nav class="menu">
          <div class="menu-item">规则&流程</div>
          <div class="menu-item active">选择教练&书院</div>
          <div class="menu-item">我的选择</div>
          <div class="menu-item">查看结果</div>
        </nav>
      </div>

      <!-- 主内容区 -->
      <div class="main-content">
        <div class="top-bar">教练和书院选择</div>

        <div class="content-area">
          <h1 class="title">基于教练选择</h1>
          <p class="intro">介绍：选择您喜欢的教练，系统将自动匹配对应的书院...</p>

         <swiper-container>
          <swiper-slide>
            Slide 1
          </swiper-slide>
          <swiper-slide>
            Slide 2
          </swiper-slide>
          <swiper-slide>
            Slide 3
          </swiper-slide>
         </swiper-container>
        

          <button class="next-button" @click="goToNextStep">下一步：对比&投票</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelectCoach',
  mounted() {
    this.initCarousel();
    window.addEventListener('keydown', this.handleKeyDown);
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  },
  methods: {
    initCarousel() {
      this.cards = document.querySelectorAll('.coach-card');
      this.currentIndex = 2; // 改为2，使第3张卡片作为默认active
      this.positionCards();
    },
    positionCards() {
      this.cards.forEach((card, index) => {
        // 增大这个数值可以让卡片间距变大
        const offset = (index - this.currentIndex) * 210;
        card.style.left = `calc(50% + ${offset}px)`;
        card.style.transform = `translateX(-50%) scale(${index === this.currentIndex ? 1 : 0.8})`;
        card.style.opacity = index === this.currentIndex ? '1' : '0.5';
        card.style.zIndex = index === this.currentIndex ? '2' : '1';
      });
    },
    handleKeyDown(e) {
      if (e.key === 'ArrowLeft' && this.currentIndex > 0) {
        this.currentIndex--;
        this.positionCards();
      } else if (e.key === 'ArrowRight' && this.currentIndex < this.cards.length - 1) {
        this.currentIndex++;
        this.positionCards();
      }
    },
    goToNextStep() {
      alert('即将跳转到对比投票页面');
      // 这里可以添加页面跳转逻辑
      // this.$router.push('/compare-vote');
    }
  }
}
</script>

<style scoped>
.page-container {
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
  display: flex;
  height: 100vh;
  background-color: #f5f5f5;
  color: #333;
}

.container {
  display: flex;
  width: 100%;
}

.sidebar {
  width: 210px;
  background-color: white;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

.profile {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #e0e0e0;
  margin-right: 10px;
}

.name {
  color: #999;
  font-size: 16px;
}

.menu {
  display: flex;
  flex-direction: column;
}

.menu-item {
  padding: 12px 0;
  color: #999;
  cursor: pointer;
  border-bottom: 1px solid #eee;
}

.menu-item.active {
  color: #1a73e8;
  font-weight: bold;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.top-bar {
  padding: 15px 20px;
  background-color: white;
  text-align: right;
  color: #999;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.content-area {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.title {
  font-size: 32px;
  margin-bottom: 10px;
}

.intro {
  color: #999;
  font-size: 14px;
  margin-bottom: 30px;
}

.coach-carousel {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 400px;
  position: relative;
  margin-bottom: 40px;
  width: 100%;
  overflow: hidden;
  min-width: 1200px;
}

.coach-card {
  width: 250px;
  height: 350px;
  background-color: #1a73e8;
  border-radius: 10px;
  position: absolute;
  transition: all 0.3s ease;
  opacity: 0.5;
  transform: scale(0.8);
}

.coach-card.active {
  opacity: 1;
  transform: scale(1);
  z-index: 2;
}


.next-button {
  float: right;
  padding: 12px 24px;
  background-color: #1a73e8;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
}

.next-button:hover {
  background-color: #0d5bba;
}
</style>