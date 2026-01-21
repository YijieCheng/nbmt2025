import { EventData } from './types';

export const EVENTS: EventData[] = [
  {
    id: '1',
    year: '2025',
    category: '能级跃升',
    title: '“浙BA” 宁波城市文旅',
    description: '积极打造体育文旅消费融合新场景，结合“浙BA”体育赛事，打造集体体育竞技、文旅推广、促销费于一体的“甬有好市”城市嘉年华。',
    imageUrl: 'https://picsum.photos/id/158/800/600', // Basketball/Performance vibe
    themeColor: 'orange',
    align: 'left',
    stats: [
        { value: '3江', label: '文旅深度融合' },
        { value: '1体', label: '体育赛事联动' },
    ]
  },
  {
    id: '2',
    year: '2025',
    category: '业态精进',
    title: '宁波入境旅游推广',
    description: '充分依托服务优势深耕入境旅游市场，创新研发契合海内外游客需求的国际化文旅融合产品，联动境内外旅行商构建多元入境客源拓展市场。',
    imageUrl: 'https://picsum.photos/id/452/800/600', // Conference/Stage
    themeColor: 'orange',
    align: 'right',
  },
  {
    id: '3',
    year: '2025',
    dateRange: '2025年10月24日-26日',
    category: '三展融合',
    title: '第十届海丝文旅大展',
    description: '“十的三次方”集结——书香十年、文博十年、旅游十年。三大品牌盛会交汇融合，展陈内容融合艺术审美、数字科技、文旅体验等元素。',
    imageUrl: 'https://picsum.photos/id/1067/800/600', // Modern architecture/Expo
    themeColor: 'red',
    align: 'left',
    stats: [
      { value: '438家', label: '线下参展企业' },
      { value: '40%', label: '较上届增长' },
      { value: '6条', label: '特色观展线路' },
      { value: '100+个', label: '国内外参观团组' },
    ]
  },
  {
    id: '4',
    year: '2025',
    dateRange: '2025年11月14日-16日',
    category: '产业融合',
    title: '第十九届中国（宁波）食品博览会',
    description: '暨第二届浙江（宁波）特色小吃博览会。集中展示产业融合、文旅消费、数智科技等领域的最新成果与发展趋势。',
    imageUrl: 'https://picsum.photos/id/292/800/600', // Food/Market
    themeColor: 'orange',
    align: 'right',
    stats: [
      { value: '40000㎡', label: '展览面积' },
      { value: '500+家', label: '展商数量' },
      { value: '13.5万人', label: '观展人数' },
    ]
  }
];