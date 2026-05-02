/**
 * 정수가 담긴 리스트 num_list가 주어집니다. num_list의 홀수만 순서대로 이어 붙인 수와 짝수만 순서대로 이어 붙인 수의 합을 return하도록 solution 함수를 완성해주세요.
 */

function solution(num_list) {
  let a = num_list.filter((num) => num % 2 === 1);
  let b = num_list.filter((num) => num % 2 === 0);
  return Number(a.join("")) + Number(b.join(""));
}
