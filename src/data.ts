/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Store {
  id: number;
  name: string;
  address: string;
  lnglat: [number, number];
  status: 'open' | 'base' | 'planned';
  rent?: number;
  phone?: string;
  coaches?: {
    name: string;
    avatar: string;
    rating: number;
    school: string;
  }[];
  pricing?: {
    type: string;
    price: string;
    description?: string;
  }[];
  medicalCheckupTime?: string;
  studentCount?: number;
}

export const stores: Store[] = [
  { id: 0, name: '徐汇龙华训练基地', address: '上海市徐汇区龙华路2577号 (近内环高架)', lnglat: [121.455, 31.175], status: 'base' },
  { id: 1, name: '德安驾校·懂车鹿学车(安亭校校区)', address: '崇信路1521弄2楼10室', lnglat: [121.240419, 31.345205], status: 'open' },
  { id: 2, name: '德安驾校懂车鹿学车(马陆校区)', address: '马陆镇宝安公路3636弄1号218室', lnglat: [121.271381, 31.327695], status: 'open' },
  { id: 3, name: '德安驾校·懂车鹿学车(莘庄校区)', address: '莘北路505号东阔颐园文创智工坊B栋5层C26室', lnglat: [121.364398, 31.110529], status: 'open' },
  { id: 4, name: '龙泉驾校·先学后付·懂车鹿(联群路总部)', address: '联群路88号龙泉驾校报名大厅', lnglat: [121.240256, 31.267768], status: 'open' },
  { id: 5, name: '德安驾校·懂车鹿学车(梅陇校区)', address: '虹梅南路3155弄51号虹柏产业园招商楼2楼办公室3', lnglat: [121.436597, 31.087988], status: 'open' },
  { id: 6, name: '德安驾校·懂车鹿学学车(日月光校区区域)', address: '沪太路1717号山海大厦2楼282室', lnglat: [121.421211, 31.286011], status: 'open' },
  { id: 7, name: '懂车鹿学车(青浦总店)', address: '康园路水都南岸27号楼1楼101号', lnglat: [121.05531, 31.086941], status: 'open' },
  { id: 8, name: '德安驾校·懂车鹿学车(南翔校区)', address: '银翔路609号301室', lnglat: [121.323355, 31.290638], status: 'open' },
  { id: 9, name: '德安驾校·懂车鹿学车(光明校区)', address: '新场镇沪南公路7360号', lnglat: [121.64723, 31.028698], status: 'open' },
  { id: 10, name: '德安驾校·懂车鹿学车(张杨校区)', address: '张杨路560号', lnglat: [121.518956, 31.227589], status: 'open' },
  { id: 11, name: '德安驾校·懂车鹿学车(龙泉校区)', address: '真新街道丰庄社区新侯路47号', lnglat: [121.365438, 31.246225], status: 'open' },
  { id: 12, name: '德安驾校·懂车鹿学车(刘行校区)', address: '顾村镇友谊西路588号2号门108', lnglat: [121.417076, 31.379519], status: 'open' },
  { id: 13, name: '德安驾校·懂车鹿学车(曹路校区)', address: '曹路镇川沙路688号', lnglat: [121.669749, 31.273241], status: 'open' },
  { id: 14, name: '德安驾校·懂车鹿学车(虹桥校区)', address: '诸光路1588弄578号虹桥世界中心D1幢3层301室', lnglat: [121.306589, 31.185218], status: 'open' },
  { 
    id: 15, 
    name: '德安驾校·懂车鹿学车(华茂校区)', 
    address: '顾陈路388号3号门16室', 
    lnglat: [121.388951, 31.336557], 
    status: 'open',
    medicalCheckupTime: '周二、四、六',
    studentCount: 25,
    pricing: [
      { type: 'C1两人一车特惠班', price: '¥3,280' },
      { type: 'C2一人一车特惠班', price: '¥3,580' },
      { type: 'VIP五次不过全额退班', price: '¥4,980' },
      { type: 'D照', price: '¥299' },
      { type: '全包 (含2圈模拟)', price: '¥899' }
    ]
  },
  { id: 16, name: '懂车鹿学车·安技驾校官方基地店', address: '南芦公路158号1号门1栋101室', lnglat: [121.714705, 31.032416], status: 'open' },
  { id: 17, name: '德安驾校·懂车鹿学车(吴泾校区)', address: '沧源路1200号', lnglat: [121.423841, 31.023878], status: 'open' },
  { id: 59, name: '待租赁地址·新赵路', address: '新赵路59号', lnglat: [121.086344, 31.256218], status: 'planned', rent: 1900 },
  { id: 60, name: '待租赁地址·华富街', address: '华富街209号', lnglat: [121.230981, 31.2442], status: 'planned', rent: 2300, phone: '15021553678' },
  { id: 61, name: '欣雨佳苑南区', address: '赵江路20号', lnglat: [121.083106, 31.25334], status: 'planned', rent: 1500, phone: '18964716806' },
  { id: 62, name: '待租赁地址·江川南路', address: '江川南路69号', lnglat: [121.27454, 31.110029], status: 'planned', rent: 1500 },
  { id: 63, name: '待租赁地址·江川路', address: '江川路1551号', lnglat: [121.373642, 30.994191], status: 'planned', rent: 1900, phone: '13295599929' },
  { id: 64, name: '待租赁地址·江川路1565弄', address: '江川路1565弄3号103室', lnglat: [121.371881, 30.993647], status: 'planned', rent: 1200, phone: '13295599929' },
  { id: 65, name: '待租赁地址·虹梅路', address: '虹梅路979号', lnglat: [121.405291, 31.155121], status: 'planned', rent: 1900, phone: '13052171009' },
  { id: 66, name: '待租赁地址·罗锦路', address: '罗锦路919号', lnglat: [121.409865, 31.121571], status: 'planned', rent: 1500, phone: '18817621972' },
  { id: 67, name: '待租赁地址·叶校路', address: '叶榭镇叶校路521弄25号', lnglat: [121.314522, 30.938424], status: 'planned', rent: 1800, phone: '13681722256' },
  { id: 68, name: '待租赁地址·北松公路', address: '北松公路287号', lnglat: [121.404315, 31.041279], status: 'planned', rent: 2800, phone: '15300859798' },
  { id: 69, name: '待租赁地址·东陆路', address: '东陆路1056号', lnglat: [121.595722, 31.272143], status: 'planned', rent: 2460, phone: '15000011496' },
  { id: 70, name: '待租赁地址·长江南路', address: '长江南路1056号', lnglat: [121.480339, 31.343329], status: 'planned', rent: 2200, phone: '15000701223' },
  { id: 71, name: '待租赁地址·普庆路', address: '六团镇普庆路520号', lnglat: [121.729803, 31.156546], status: 'planned', rent: 2200, phone: '18818204084' },
  { id: 72, name: '待租赁地址·南芦公路', address: '南芦公路与川南奉公路交叉口', lnglat: [121.761292, 30.954561], status: 'planned', rent: 600, phone: '15021314969' },
  { id: 73, name: '待租赁地址·虹梅路1023号', address: '虹梅路1023号', lnglat: [121.404526, 31.156462], status: 'planned', phone: '13052171009' },
  { id: 74, name: '待租赁地址·龙吴路', address: '龙吴路5694号', lnglat: [121.469086, 31.039047], status: 'planned', rent: 2000, phone: '18817561150' },
  { id: 75, name: '待租赁地址·永跃路', address: '永跃路360号', lnglat: [121.511663, 31.027547], status: 'planned', rent: 1700, phone: '19271559708' },
  { 
    id: 18, 
    name: '汪汪学车团队', 
    address: '齐爱路300号', 
    lnglat: [121.655987, 31.212058], 
    status: 'base', 
    coaches: [
      { name: '谢宗琴', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop', rating: 4.9, school: '汪汪学车团队' },
      { name: '付秀丽', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop', rating: 4.8, school: '汪汪学车团队' }
    ] 
  },
  { id: 19, name: '银都驾校报名处·车掌门学车', address: '申港路298号', lnglat: [121.351107, 31.070459], status: 'base' },
  { id: 20, name: '安亭基地学车报名处', address: '伊宁路2000号', lnglat: [121.223521, 31.340101], status: 'base' },
  { id: 21, name: '春申基地', address: '淀南路69号', lnglat: [121.353485, 31.113869], status: 'base' },
  { id: 22, name: '梅陇基地', address: '双柏路1333弄', lnglat: [121.431487, 31.086571], status: 'base' },
  { id: 23, name: '大众基地', address: '北青公路4149号', lnglat: [121.239621, 31.199745], status: 'base' },
  { id: 24, name: '光明七宝训练场', address: '沪青平公路501号', lnglat: [121.342589, 31.173680], status: 'base' },
  { id: 25, name: '光明宝山训练场', address: '友谊路1136号', lnglat: [121.460683, 31.396408], status: 'base' },
  { id: 26, name: '光明三林训练场', address: '上南路4160号', lnglat: [121.507348, 31.145160], status: 'base' },
  { id: 27, name: '光明金桥训练场', address: '金明路75号', lnglat: [121.607211, 31.230411], status: 'base' },
  { id: 28, name: '光明基地', address: '周祝公路158号', lnglat: [121.599052, 31.098983], status: 'base' },
  { id: 29, name: '锦隆基地', address: '富锦路2028号', lnglat: [121.422549, 31.396641], status: 'base' },
  { id: 30, name: '金山基地', address: '亭枫公路767号', lnglat: [121.304600, 30.888172], status: 'base' },
  { id: 31, name: '三林基地', address: '三林路91号', lnglat: [121.494535, 31.136374], status: 'base' },
  { id: 32, name: '星火基地', address: '随塘河路325号', lnglat: [121.606813, 30.853244], status: 'base' },
  { id: 33, name: '和悦基地', address: '人民塘东路801号', lnglat: [121.557474, 30.840293], status: 'base' },
  { id: 34, name: '旗忠基地', address: '光华路2118号', lnglat: [121.357654, 31.060174], status: 'base' },
  { id: 35, name: '申诚基地', address: '江心沙路9号', lnglat: [121.543903, 31.343384], status: 'base' },
  { id: 36, name: '安技基地', address: '南芦公路158号', lnglat: [121.714705, 31.032416], status: 'base' },
  { id: 37, name: '金桥训练场', address: '金沪路116号', lnglat: [121.610274, 31.257357], status: 'base' },
  { id: 38, name: '申浦训练场', address: '金明路75号', lnglat: [121.607211, 31.230411], status: 'base' },
  { id: 39, name: '佘山训练场', address: '林绿路69号', lnglat: [121.222873, 31.095228], status: 'base' },
  { id: 40, name: '邮佳基地', address: '鹿吉路318号', lnglat: [121.690533, 31.101497], status: 'base' },
  { id: 41, name: '恒通基地', address: '曹新公路800号', lnglat: [121.321658, 31.434438], status: 'base' },
  { id: 42, name: '松林基地', address: '朱家角小港村190号', lnglat: [121.043047, 31.072537], status: 'base' },
  { id: 43, name: '尊昊训练场', address: '红旗东路88号', lnglat: [121.365264, 30.764229], status: 'base' },
  { id: 44, name: '悦隆基地', address: '枫阳路869号', lnglat: [121.010059, 30.895750], status: 'base' },
  { id: 45, name: '泥城训练场', address: '泥城镇3组', lnglat: [121.695938, 31.034416], status: 'base' },
  { id: 46, name: '和悦训练场', address: '同乐路190号', lnglat: [121.417140, 31.125407], status: 'base' },
  { id: 47, name: '南翔训练场', address: '思星路29号', lnglat: [121.324293, 31.332525], status: 'base' },
  { id: 48, name: '军体基地', address: '新同心路318号', lnglat: [121.468305, 31.278437], status: 'base' },
  { id: 49, name: '万国基地', address: '奉苗公路299号', lnglat: [121.674028, 30.869917], status: 'base' },
  { id: 50, name: '金山云之驾', address: '新利路9128号', lnglat: [121.216680, 30.888465], status: 'base' },
  { id: 51, name: '崇明正洪', address: '岱山路136号', lnglat: [121.375378, 31.636436], status: 'base' },
  { id: 52, name: '新河基地', address: '新河公路858号', lnglat: [121.516987, 31.584363], status: 'base' },
  { id: 53, name: '荣安浦江训练场', address: '三鲁公路328号', lnglat: [121.533479, 31.018146], status: 'base' },
  { id: 54, name: '沪南训练场', address: '南六公路1388号', lnglat: [121.701813, 31.084424], status: 'base' },
  { id: 55, name: '安达训练场', address: '民民路1号', lnglat: [121.650826, 31.271169], status: 'base' },
  { id: 56, name: '易驰训练场', address: '镇北路3号', lnglat: [121.676928, 31.269495], status: 'base' },
  { id: 57, name: '联农训练场', address: '粒民路82号', lnglat: [121.554333, 31.109034], status: 'base' },
  { id: 58, name: '小昆山基地', address: '平原街398号', lnglat: [121.130021, 31.031854], status: 'base' }
];
