var ACTIONSTR = {
    "homework_00":"TEACHEROUTSIDECLASSCORRECT",
    "homework_01":"teacher_outside_class_correct_by_question",
    "homework_02":"STUDENTOUTSIDECLASSCORRECTEACHOTHER",
    "homework_10":"TEACHEROUTSIDECLASSRECORRECTBYPEOPLE",
    "homework_11":"TEACHEROUTSIDECLASSRECORRECTBYQUESTION",
    "homework_20":"teacher_outside_class_re_correct_by_person",
    "homework_21":"teacher_outside_class_re_correct_by_question",
    "homework_30":"STUDENTOUTSIDECLASSCHECK",
    "homework_31":"teacher_outside_class_check_paper",
    "homework_32":"teacher_outside_class_look_class_detail",
    "homework_40":"STUDENTOUTSIDECLASSDOHOMEWORK",
    "homework_41":"teacher_do_homework",
    "homework_50":"STUDENTOUTSIDECLASSREVISE",
    "homework_60":"STUDENTOUTSIDECLASSCOURSEWAREANDMICROCLASSHOMEWORK",
    "exam_00":"teacher_outside_class_exam_correct_by_people",
    "exam_01":"teacher_outside_class_online_exam_correct_by_question",
    "exam_10":"teacher_outside_class_exam_re_correct_by_people",
    "exam_11":"teacher_outside_class_online_exam_re_correct_by_question",
    "exam_30":"STUDENTOUTSIDECLASSONLINEEXAMCHECK",
    "exam_31":"teacher_outside_class_check_paper",
    "exam_40":"STUDENTOUTSIDECLASSONLINEEXAM",
    "exam_50":"STUDENTOUTSIDECLASSONLINEEXAMREVISE",
}
function getAction(isExam,correctType) {
    var key = "homework";
    if(isExam) { //考试或者旧作业
        key = "exam"
    } else { //新考试
        key = "homework"
    }
    return ACTIONSTR[key+"_"+correctType];
}
export { getAction };