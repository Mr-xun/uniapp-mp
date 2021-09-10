/**
 * Created by Mr-Xun on 2021-08-30
 * 招聘相关
 **/
const {
	Service
} = require('uni-cloud-router')

module.exports = class RecruitService extends Service {
	//发布
	async publish(publicInfo) {
		let response = {
			code: 200,
			data: null,
			msg: '发布成功',
		}
		let user = this.ctx.auth;
		console.log( publicInfo, 111)
		let inserData = {
			comopany: publicInfo.company, //所属公司
			comopany_id: '', //所属公司
			title: publicInfo.title, //求职标题
			content: publicInfo.content,//职责描述
			category: ['招工类别1', '类别2'],
			type: publicInfo.type, //岗位类型
			welfare_tags: [], //福利标签
			salary_type: 1, //工资类型 1 范围 2固定 3 面谈
			salary_fix: publicInfo.salary_fix, //固定工资
			salary_area_min: 100, //最小工资
			salary_area_max: 200, //最高工资
			salary_unit: '元/月', //工资单位
			salary_payment_way: '', //工资结算方式 1: 月付  2：日结
			apply_education: publicInfo.apply_education, //学历
			apply_gender: publicInfo.apply_gender, //性别
			apply_age: publicInfo.apply_age, //年龄
			apply_age_min: 20, //最小年龄
			apply_age_max: 60, //最大年龄
			apply_experience: '不限', //工作经验
			work_organ: '', //招聘组织机构
			work_environment: [], //工作环境
			work_contry: '', //工作地点所属国家
			work_province: '', //工作地点所属省份
			work_city: '', //工作地点所属城市
			work_district: '', //工作地点所属市区
			work_address: publicInfo.work_address, //工作地点所属地址
			work_geo_location: {}, //工作地点所属地理位置
			work_way: 1, //工作方式 1长期 2短期
			work_date_type: 1, //工作日期方式 1 任意时间 2工作日 3周末节假日  4依据个人安排
			work_date_start: '', //工作开始日期
			work_date_end: '', //工作结束日期
			work_time_type: 1, //工作时间方式  1 不限 2 自定义
			work_time_start: '', //工作开始时间
			work_time_end: '', //工作结束时间
			recruit_count:  publicInfo.recruit_count, //招聘人数
			contact_way: 1, //联系方式
			contact_value: '17810204418', //联系电话
			status: 1, //招聘状态 1 发布中 2 已过期 
			is_delete: 0, //删除状态 0 未删除 1 已删除
			end_time: '', //结束时间,
			publish_uid: user.uid, //发布用户uid
			publish_uid_name: user.userInfo.nickname, //发布用户昵称
			publish_uid_avatar: user.userInfo.avatar, //发布用户头像
			publish_time: new Date().getTime(), //发布时间
		}
		inserData = Object.assign(inserData, publicInfo)
		console.log(inserData, publicInfo, 22)
		await this.db.collection('job-recruit').add(inserData)
		return response
	}
	//列表
	async myList() {
		let response = {
			code: 200,
			data: null,
			msg: '获取成功',
		}
		let user = this.ctx.auth;
		const dbCmd = this.db.command;
		let dbRes = await this.db.collection('job-recruit').where({
			publish_uid: user.uid,
			id_delete: dbCmd.neq(1)
		}).get()
		response.data = dbRes.data;
		return response
	}
}
