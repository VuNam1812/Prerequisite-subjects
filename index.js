const generateDirect = (position, data) => {
  const directs = [];

  const findDirect = (list, direct = "") => {
    if (!list || list?.length === 0) return true;

    const oldDirect = direct;

    for (const key of list) {
      direct += `-${key}`;
      const canDirect = findDirect(data[key], direct);

      if (canDirect) {
        directs.push(direct);
      } else {
        direct = oldDirect;
      }
    }

    return false;
  };

  findDirect(data[position], `${position}`);

  return directs;
};

const canMoveToPos = (directs, end) => {
  if (!directs.length) return false;
  for (const direct of directs) {
    const idx = direct.split("-").includes(`${end}`);
    if (idx) {
      return true;
    }
  }
  return false;
};

const checkValidateCourse = (pre) => {
  const result = {};
  let returnValue = true;
  pre[1].forEach((ele) => {
    if (!returnValue) return;
    const idx_course = ele[1];
    const idx_course_condition = ele[0];
    if (idx_course === idx_course_condition) {
      returnValue = false;
      return;
    }
    if (!result[idx_course] && !result[idx_course_condition]) {
      result[idx_course] = [
        ...(result[idx_course] || []),
        idx_course_condition,
      ];
    } else {
      const directsConditionToCourse = generateDirect(idx_course, result);

      if (!canMoveToPos(directsConditionToCourse, idx_course_condition)) {
        if (!result[idx_course_condition]) {
          result[idx_course] = [
            ...(result[idx_course] || []),
            idx_course_condition,
          ];
        } else {
          const directsCourseToCondition = generateDirect(
            idx_course_condition,
            result
          );

          if (!canMoveToPos(directsCourseToCondition, idx_course)) {
            result[idx_course] = [
              ...(result[idx_course] || []),
              idx_course_condition,
            ];
          } else {
            returnValue = false;
          }
        }
      }
    }
  });

  return returnValue;
};

const testCase_1 = [2, [[1, 0]]];
const testCase_2 = [2, [[1, 0],[0, 1]]];

console.log("TEST_CASE_1", checkValidateCourse(testCase_1));
console.log("TEST_CASE_2", checkValidateCourse(testCase_2));
